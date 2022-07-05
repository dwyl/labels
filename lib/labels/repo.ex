defmodule Labels.Repo do
  use Ecto.Repo,
    otp_app: :labels,
    adapter: Ecto.Adapters.Postgres
end
