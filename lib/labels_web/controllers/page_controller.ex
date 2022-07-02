defmodule LabelsWeb.PageController do
  use LabelsWeb, :controller

  def index(conn, _params) do
    oauth_github_url = ElixirAuthGithub.login_url(%{scopes: ["user:email"]})
    render(conn, "index.html", oauth_github_url: oauth_github_url)
  end
end
