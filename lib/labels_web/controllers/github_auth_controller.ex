defmodule LabelsWeb.GithubAuthController do
  use LabelsWeb, :controller

  @doc """
  `index/2` handles the callback from GitHub Auth API redirect.
  """
  def index(conn, %{"code" => code}) do
    {:ok, profile} = ElixirAuthGithub.github_auth(code)

    conn
    |> put_view(LabelsWeb.PageView)
    |> render(:welcome, profile: profile)
  end
end
