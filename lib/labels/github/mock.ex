defmodule Labels.Github.Mock do
  @behaviour Labels.Github.Github

  @impl true
  def get_profile(_code) do
    {:ok, %{access_token: "123"}}
  end
end
