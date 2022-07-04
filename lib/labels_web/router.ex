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

  pipeline :api do
    plug :accepts, ["json"]
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
  end

  # Other scopes may use custom stacks.
  # scope "/api", LabelsWeb do
  #   pipe_through :api
  # end

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through :browser

      live_dashboard "/dashboard", metrics: LabelsWeb.Telemetry
    end
  end

  # Enables the Swoosh mailbox preview in development.
  #
  # Note that preview only shows emails that were sent by the same
  # node running the Phoenix server.
  if Mix.env() == :dev do
    scope "/dev" do
      pipe_through :browser

      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
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
