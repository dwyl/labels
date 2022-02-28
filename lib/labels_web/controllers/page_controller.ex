defmodule LabelsWeb.PageController do
  use LabelsWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
