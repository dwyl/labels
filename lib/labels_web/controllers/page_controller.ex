defmodule LabelsWeb.PageController do
  use LabelsWeb, :controller
  alias Labels.Repository

  @doc """
  Render page to sync a new repository
  """
  def index(conn, _params) do
    repositories = Repository.list_repositories(conn.assigns.github_user_id)

    render(conn, "index.html", [repositories: repositories] ++ form_values())
  end

  @doc """
  action called when a new sync repository form is submitted
  """
  def sync(conn, %{"sync_labels" => form}) do
    github_user_id = conn.assigns.github_user_id
    token = conn.assigns.github_token
    source_owner = form["source_owner"]
    source_repo = form["source_repo"]
    target_owner = form["target_owner"]
    target_repo = form["target_repo"]
    repositories = Repository.list_repositories(conn.assigns.github_user_id)

    with {{:ok, source_labels}, :source} <-
           {get_labels(token, source_owner, source_repo), :source},
         {{:ok, target_labels}, :target} <-
           {get_labels(token, target_owner, target_repo), :target},
         :ok <-
           create_or_update_labels(token, target_owner, target_repo, source_labels, target_labels),
         {:ok, _repo} <-
           Repository.upsert(%{
             github_user_id: github_user_id,
             owner: target_owner,
             repo_name: target_repo
           }) do
      # create ok changeset -> keep source info, remove target info
      conn
      |> put_flash(:info, "Labels synched!")
      |> render(
        "index.html",
        [repositories: repositories] ++
          form_values(source_owner: source_owner, source_repo: source_repo)
      )
    else
      {{:error, :not_found}, repo} ->
        conn
        |> put_flash(:error, "#{repo} repository not found")
        |> render(
          "index.html",
          [repositories: repositories] ++
            form_values(
              source_owner: source_owner,
              source_repo: source_repo,
              target_owner: target_owner,
              target_repo: target_repo
            )
        )
    end
  end

  def sync_repos(conn, %{"sync_repos" => form}) do
    github_user_id = conn.assigns.github_user_id
    token = conn.assigns.github_token
    source_owner = form["source_owner"]
    source_repo = form["source_repo"]
    repositories = Repository.list_repositories(github_user_id)

    with {:ok, source_labels} <- get_labels(token, source_owner, source_repo),
         :ok <- sync_repositories(token, repositories, source_labels) do
      conn
      |> put_flash(:info, "Labels synched on repositories")
      |> redirect(to: Routes.page_path(conn, :index))
    else
      {:error, :not_found} ->
        conn
        |> put_flash(:error, "source repository not found")
        |> redirect(to: Routes.page_path(conn, :index))

      :error ->
        conn
        |> put_flash(:error, "Error while updating labels on one of the repository")
        |> redirect(to: Routes.page_path(conn, :index))
    end
  end

  # get source and target labels
  defp get_labels(token, owner, repo) do
    case github_api().get_labels(token, owner, repo) do
      {:ok, labels} -> {:ok, labels}
      _ -> {:error, :not_found}
    end
  end

  # Send request to update or create labels
  defp create_or_update_labels(token, owner, repo, source_labels, target_labels) do
    target_label_names = Enum.map(target_labels, & &1["name"])

    source_labels
    |> Enum.map(fn label ->
      if Enum.member?(target_label_names, label["name"]) do
        updated_label = Map.put(label, :new_name, label["name"])

        Task.async(github_api(), :update_label, [token, owner, repo, label["name"], updated_label])
      else
        Task.async(github_api(), :create_label, [token, owner, repo, label])
      end
    end)
    |> Enum.map(fn task -> Task.await(task) end)

    :ok
  end

  defp sync_repo(token, source_labels, target_owner, target_repo) do
    with {:ok, target_labels} <-
           get_labels(token, target_owner, target_repo),
         :ok <-
           create_or_update_labels(token, target_owner, target_repo, source_labels, target_labels) do
      :ok
    else
      _ -> :error
    end
  end

  @doc """
  sync lables on repositories
  """
  @spec sync_repositories(
          token :: String.t(),
          repositories :: list({String.t(), String.t()}),
          source_labels :: list(Map.t())
        ) :: :ok | :error
  def sync_repositories(token, repositories, source_labels) do
    res =
      repositories
      |> Enum.map(fn {owner, repo} ->
        Task.async(fn -> sync_repo(token, source_labels, owner, repo) end)
      end)
      |> Enum.map(fn task -> Task.await(task) end)

    if Enum.all?(res, fn r -> r == :ok end) do
      :ok
    else
      :error
    end
  end

  defp form_values(opts \\ []) do
    [
      source_owner: opts[:source_owner] || "dwyl",
      source_repo: opts[:source_repo] || "labels",
      target_owner: opts[:target_owner],
      target_repo: opts[:target_repo]
    ]
  end

  defp github_api, do: Application.get_env(:labels, :github_api)
end
