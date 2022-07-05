defmodule LabelsWeb.PageControllerTest do
  use LabelsWeb.ConnCase

  test "GET / redirect to login when not logged in", %{conn: conn} do
    conn = get(conn, "/")
    assert redirected_to(conn, 302) =~ "/login"
  end

  test "GET / diplay page when logged in", %{conn: conn} do
    conn =
      conn
      |> Plug.Test.init_test_session(github_token: "123")
      |> get("/")

    assert html_response(conn, 200)
  end
end
