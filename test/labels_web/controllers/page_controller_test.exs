defmodule LabelsWeb.PageControllerTest do
  use LabelsWeb.ConnCase

  test "GET / redirect to login when not logged in", %{conn: conn} do
    conn = get(conn, "/")
    assert redirected_to(conn, 302) =~ "/login"
  end

  test "GET / diplay page when logged in", %{conn: conn} do
    conn =
      conn
      |> Plug.Test.init_test_session(github_token: "123", github_user_id: 1234)
      |> get("/")

    assert html_response(conn, 200)
  end

  test "Post /sync redirect to / with source repository not found", %{conn: conn} do
    data = %{
      "source_owner" => "dwyl",
      # mock will return :not_found
      "source_repo" => "notfound",
      "target_owner" => "dwyl",
      "target_repo" => "app"
    }

    conn =
      conn
      |> Plug.Test.init_test_session(github_token: "123", github_user_id: 1234)
      |> post("/sync", %{"sync_labels" => data})

    saved_assigns = conn.assigns
    assert "/" = redir_path = redirected_to(conn, 302)

    conn =
      conn
      |> recycle()
      |> Map.put(:assigns, saved_assigns)
      |> get(redir_path)

    assert html_response(conn, 200) =~ "source repository not found"
  end

  test "Post /sync redirect to /", %{conn: conn} do
    data = %{
      "source_owner" => "dwyl",
      "source_repo" => "labels",
      "target_owner" => "dwyl",
      "target_repo" => "app"
    }

    conn =
      conn
      |> Plug.Test.init_test_session(github_token: "123", github_user_id: 1234)
      |> post("/sync", %{"sync_labels" => data})

    assert redirected_to(conn, 302) =~ "/"
  end
end
