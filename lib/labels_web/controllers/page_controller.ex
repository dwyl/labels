defmodule LabelsWeb.PageController do
  use LabelsWeb, :controller

  @doc """
  Render main application page
  """
  def index(conn, _params) do
    render(conn, "index.html")
  end

  def sync(conn, %{"sync_labels" => form}) do
    {:ok, source_labels} =
      github_api().get_labels(
        conn.assigns.github_token,
        form["source_owner"],
        form["source_repo"]
      )

    {:ok, target_labels} =
      github_api().get_labels(
        conn.assigns.github_token,
        form["target_owner"],
        form["target_repo"]
      )

    # Enum.each(labels, fn label ->
    #   github_api().create_label(conn.assigns.github_token, "simonLab", "time-mvp", label)
    # end)

    conn
    |> put_flash(:info, "Labels synced!")
    |> redirect(to: Routes.page_path(conn, :index))
  end

  defp github_api, do: Application.get_env(:labels, :github_api)
end
