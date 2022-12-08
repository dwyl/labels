defmodule Labels.Github.Api do
  @behaviour Labels.Github.Github
  require Logger

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
      Req.get!(req,
        url: "/repos/#{owner}/#{repo}/labels?per_page=100",
        auth: {:bearer, token},
        user_agent: "dwyl-labels"
      )

    check_api_response(res)
  end

  @impl true
  def create_label(token, owner, repo, label) do
    res =
      Req.post!("https://api.github.com/repos/#{owner}/#{repo}/labels",
        auth: {:bearer, token},
        json: label,
        user_agent: "dwyl-labels"
      )

    Logger.info("create label: #{label["name"]}, response status: #{res.status}")
    check_api_response(res)
  end

  @impl true
  def update_label(token, owner, repo, label_name, label) do
    endpoint = URI.encode("https://api.github.com/repos/#{owner}/#{repo}/labels/#{label_name}")

    res =
      Req.patch!(endpoint,
        auth: {:bearer, token},
        json: label,
        user_agent: "dwyl-labels"
      )

    Logger.info("update label: #{label["name"]}, response status: #{res.status}")
    check_api_response(res)
  end

  defp check_api_response(res) do
    case res.status do
      # label updated
      200 -> {:ok, res.body}
      # label created
      201 -> {:ok, res.body}
      404 -> {:error, :not_found}
      # see https://docs.github.com/en/rest/overview/resources-in-the-rest-api?apiVersion=2022-11-28#failed-login-limit
      401 -> {:error, :unauthorized}
      403 -> {:error, :forbidden}
      _ -> {:error, :unknown}
    end
  end
end
