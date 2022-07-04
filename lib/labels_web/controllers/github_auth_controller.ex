defmodule LabelsWeb.GithubAuthController do
  use LabelsWeb, :controller

  @doc """
  `index/2` handles the callback from GitHub Auth API redirect.
  """
  def index(conn, %{"code" => code}) do
    {:ok, profile} = ElixirAuthGithub.github_auth(code)

    conn
    |> assign(:github_token, profile.access_token)
    |> put_session(:github_token, profile.access_token)
    |> configure_session(renew: true)
    |> put_flash(:info, "authenticated!")
    |> redirect(to: Routes.page_path(conn, :index))
  end

  def login(conn, _params) do
    oauth_github_url = ElixirAuthGithub.login_url(%{scopes: ["user:email"]})
    render(conn, "login.html", oauth_github_url: oauth_github_url)
  end
end
