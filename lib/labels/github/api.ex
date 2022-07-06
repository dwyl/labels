defmodule Labels.Github.Api do
  @behaviour Labels.Github.Github

  @impl true
  def login_url(scopes) do
    ElixirAuthGithub.login_url(%{scopes: scopes})
  end

  @impl true
  def get_profile(code), do: ElixirAuthGithub.github_auth(code)

  @impl true
  def get_labels(token, owner, repo) do
    req = Req.new(base_url: "https://api.github.com")

    res =
      Req.get!(req, url: "/repos/#{owner}/#{repo}/labels?per_page=100", auth: {:bearer, token})

    case res.status do
      200 -> {:ok, res.body}
      404 -> {:error, :not_found}
      _ -> {:error, :unknown}
    end
  end

  @impl true
  def create_label(token, owner, repo, label) do
    res =
      Req.post!("https://api.github.com/repos/#{owner}/#{repo}/labels",
        auth: {:bearer, token},
        json: label
      )

    {:ok, res.status}
  end

  @impl true
  def update_label(token, owner, repo, label_name, label) do
    res =
      Req.patch!("https://api.github.com/repos/#{owner}/#{repo}/labels/#{label_name}",
        auth: {:bearer, token},
        json: label
      )

    {:ok, res.status}
  end
end
