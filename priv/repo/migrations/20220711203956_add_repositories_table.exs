defmodule Labels.Repo.Migrations.AddRepositoriesTable do
  use Ecto.Migration

  def change do
    create table(:repositories) do
      add :github_user_id, :integer
      add :owner, :string
      add :repo_name, :string

      timestamps()
    end

    create unique_index(:repositories, [:owner, :repo_name])
  end
end
