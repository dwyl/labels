defmodule Labels.Github.Github do
  @callback login_url(list(String.t())) :: String.t()
  @callback get_profile(code :: String.t()) :: {:ok, Map.t()} | {:error, any()}
  @callback get_labels(token :: String.t(), owner :: String.t(), repo :: String.t()) ::
              {:ok, list(String.t())} | {:error, any()}
end
