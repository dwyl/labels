defmodule LabelsWeb.Router do
  use LabelsWeb, :router
  alias LabelsWeb.Router.Helpers, as: Routes

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, {LabelsWeb.LayoutView, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug :assign_github_token
  end

  pipeline :auth do
    plug :authenticate
  end

  scope "/", LabelsWeb do
    pipe_through :browser

    get "/login", GithubAuthController, :login
    get "/auth/github/callback", GithubAuthController, :index
  end

  scope "/", LabelsWeb do
    pipe_through [:browser, :auth]

    get "/", PageController, :index
    post "/sync", PageController, :sync
    delete "/logout", GithubAuthController, :logout
  end

  defp assign_github_token(conn, _opts) do
    github_token = get_session(conn, :github_token)
    assign(conn, :github_token, github_token)
  end

  defp authenticate(conn, _opts) do
    if conn.assigns.github_token do
      conn
    else
      conn
      |> put_flash(:error, "Please login first to use Labels")
      |> redirect(to: Routes.github_auth_path(conn, :login))
      |> halt()
    end
  end
end
