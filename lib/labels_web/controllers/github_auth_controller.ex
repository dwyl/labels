defmodule LabelsWeb.GithubAuthController do
  use LabelsWeb, :controller

  @doc """
  `index/2` handles the callback from GitHub Auth API redirect.
  """
  def index(conn, %{"code" => code}) do
    {:ok, profile} = github_api().get_profile(code)

    conn
    |> assign(:github_token, profile.access_token)
    |> assign(:github_user_id, profile.id)
    |> put_session(:github_token, profile.access_token)
    |> put_session(:github_user_id, profile.id)
    |> configure_session(renew: true)
    |> put_flash(:info, "authenticated!")
    |> redirect(to: Routes.page_path(conn, :index))
  end

  @doc """
  Display the login page
  """
  def login(conn, _params) do
    oauth_github_url = github_api().login_url(["user:email", "repo"])
    render(conn, "login.html", oauth_github_url: oauth_github_url)
  end

  @doc """
  Delete the session and redirect to login page
  """
  def logout(conn, _params) do
    conn
    |> configure_session(drop: true)
    |> redirect(to: Routes.github_auth_path(conn, :login))
  end

  defp github_api, do: Application.get_env(:labels, :github_api)
end
