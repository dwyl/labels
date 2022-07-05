defmodule LabelsWeb.PageController do
  use LabelsWeb, :controller

  @doc """
  Render main application page
  """
  def index(conn, _params) do
    render(conn, "index.html")
  end
end
