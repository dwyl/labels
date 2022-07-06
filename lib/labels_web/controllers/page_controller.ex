defmodule LabelsWeb.PageController do
  use LabelsWeb, :controller

  @doc """
  Render main application page
  """
  def index(conn, _params) do
    render(conn, "index.html")
  end

  def sync(conn, %{"sync_labels" => form}) do
    token = conn.assigns.github_token
    source_owner = form["source_owner"]
    source_repo = form["source_repo"]
    target_owner = form["target_owner"]
    target_repo = form["target_repo"]

    with {:ok, _source_labels, _target_labels} <-
           get_labels(token, source_owner, source_repo, target_owner, target_repo) do
      conn
      |> put_flash(:info, "Labels synced!")
      |> redirect(to: Routes.page_path(conn, :index))
    else
      {:error, :not_found, repo} ->
        conn
        |> put_flash(:error, "#{repo} repository not found")
        |> redirect(to: Routes.page_path(conn, :index))
    end

    # Enum.each(labels, fn label ->
    #   github_api().create_label(conn.assigns.github_token, "simonLab", "time-mvp", label)
    # end)
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

  defp github_api, do: Application.get_env(:labels, :github_api)
end
