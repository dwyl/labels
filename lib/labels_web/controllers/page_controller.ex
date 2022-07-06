defmodule LabelsWeb.PageController do
  use LabelsWeb, :controller

  @doc """
  Render main application page
  """
  def index(conn, _params) do
    labels = github_api().get_labels(conn.assigns.github_token, "dwyl", "labels")
    # Enum.each(labels, fn label ->
    #   github_api().create_label(conn.assigns.github_token, "simonLab", "time-mvp", label)
    # end)

    render(conn, "index.html", labels: labels)
  end

  defp github_api, do: Application.get_env(:labels, :github_api)
end
