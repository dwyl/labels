defmodule LabelsWeb.PageController do
  use LabelsWeb, :controller
  alias Labels.Repository

  @doc """
  Render main application page
  """
  def index(conn, _params) do
    repositories = Repository.list_repositories(conn.assigns.github_user_id)
    render(conn, "index.html", repositories: repositories)
  end

  def sync(conn, %{"sync_labels" => form}) do
    github_user_id = conn.assigns.github_user_id
    token = conn.assigns.github_token
    source_owner = form["source_owner"]
    source_repo = form["source_repo"]
    target_owner = form["target_owner"]
    target_repo = form["target_repo"]

    with {:ok, source_labels, target_labels} <-
           get_labels(token, source_owner, source_repo, target_owner, target_repo),
         :ok <-
           create_update_labels(token, target_owner, target_repo, source_labels, target_labels),
         {:ok, _repo} <-
           Repository.upsert(%{
             github_user_id: github_user_id,
             owner: target_owner,
             repo_name: target_repo
           }) do
      conn
      |> put_flash(:info, "Labels synched!")
      |> redirect(to: Routes.page_path(conn, :index))
    else
      {:error, :not_found, repo} ->
        conn
        |> put_flash(:error, "#{repo} repository not found")
        |> redirect(to: Routes.page_path(conn, :index))
    end
  end

  # get source and target labels
  defp get_labels(token, source_owner, source_repo, target_owner, target_repo) do
    with {{:ok, source_labels}, :source} <-
           {github_api().get_labels(token, source_owner, source_repo), :source},
         {{:ok, target_labels}, :target} <-
           {github_api().get_labels(token, target_owner, target_repo), :target} do
      {:ok, source_labels, target_labels}
    else
      {{:error, :not_found}, repo} -> {:error, :not_found, repo}
    end
  end

  # Send request to update or create labels
  defp create_update_labels(token, owner, repo, source_labels, target_labels) do
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

  defp github_api, do: Application.get_env(:labels, :github_api)
end
