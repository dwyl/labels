defmodule Labels.Repository do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query
  alias Labels.Repo

  schema "repositories" do
    field :github_user_id, :integer
    field :owner, :string
    field :repo_name, :string

    timestamps()
  end

  def changeset(repository, attrs) do
    repository
    |> cast(attrs, [:github_user_id, :owner, :repo_name])
    |> validate_required([:github_user_id, :owner, :repo_name])
    |> unique_constraint([:owner, :repo_name])
  end

  def list_repositories(github_user_id) do
    query =
      from r in "repositories",
        where: r.github_user_id == ^github_user_id,
        order_by: [desc: :inserted_at],
        select: r.repo_name

    Repo.all(query)
  end
end
