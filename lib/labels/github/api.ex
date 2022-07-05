defmodule Labels.Github.Api do
  @behaviour Labels.Github.Github

  @impl true
  def login_url(scopes) do
    ElixirAuthGithub.login_url(%{scopes: scopes})
  end

  @impl true
  def get_profile(code), do: ElixirAuthGithub.github_auth(code)
end
