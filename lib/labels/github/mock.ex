defmodule Labels.Github.Mock do
  @behaviour Labels.Github.Github

  @impl true
  def login_url(_sopes) do
    "https://github.com/login/oauth/authorize?client_id=123"
  end

  @impl true
  def get_profile(_code) do
    {:ok, %{access_token: "123"}}
  end

  @impl true
  def get_labels(_token, _owner, _repo) do
    {:ok, ["label1", "label2"]}
  end

  @impl true
  def create_label(_token, _owner, _repo, _label) do
    {:ok, %{}}
  end

  @impl true
  def update_label(_token, _owner, _repo, _label_name, _label) do
    {:ok, %{}}
  end
end
