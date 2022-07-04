defmodule Labels.Github.Api do
  @behaviour Labels.Github.Github

  @impl true
  def get_profile(code), do: ElixirAuthGithub.github_auth(code)
end
