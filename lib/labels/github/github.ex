defmodule Labels.Github.Github do
  @callback login_url(list(String.t())) :: String.t()
  @callback get_profile(code :: String.t()) :: {:ok, Map.t()} | {:error, any()}
end
