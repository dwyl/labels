defmodule Labels.Github.Api do
  @behaviour Labels.Github.Github

  @impl true
  def login_url(scopes) do
    ElixirAuthGithub.login_url(%{scopes: scopes})
  end

  @impl true
  def get_profile(code), do: ElixirAuthGithub.github_auth(code)

  @impl true
  def get_labels(token, _owner, _repo) do
    req = Req.new(base_url: "https://api.github.com")

    labels =
      Req.get!(req, url: "/repos/dwyl/labels/labels?per_page=100", auth: {:bearer, token}).body

    {:ok, labels}
  end

  def create_label(token, _owner, _repo, label) do
    res =
      Req.post!("https://api.github.com/repos/SimonLab/time-mvp/labels",
        auth: {:bearer, token},
        json: label
      )

    {:ok, res.status}
  end
end
