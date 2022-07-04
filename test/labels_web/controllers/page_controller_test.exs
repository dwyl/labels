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

  test "DELETE /logout page redirect when not logged in", %{conn: conn} do
    conn = delete(conn, "/logout")
    assert redirected_to(conn, 302) =~ "/login"
  end

  test "DELETE /logout redirect also to login once logged out", %{conn: conn} do
    conn =
      conn
      |> Plug.Test.init_test_session(github_token: "123")
      |> delete("/logout")

    assert redirected_to(conn, 302) =~ "/login"
  end
end
