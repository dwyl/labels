defmodule Labels.Github.Github do
  @callback get_profile(code :: String.t()) :: {:ok, Map.t()} | {:error, any()}
end
