defmodule LabelsWeb.GithubAuthControllerTest do
  use LabelsWeb.ConnCase

  test "DELETE /logout page redirect when not logged in", %{conn: conn} do
    conn = delete(conn, "/logout")
    assert redirected_to(conn, 302) =~ "/login"
  end

  test "DELETE /logout redirect also to login once logged out", %{conn: conn} do
    conn =
      conn
      |> Plug.Test.init_test_session(github_token: "123", github_user_id: 1234)
      |> delete("/logout")

    assert redirected_to(conn, 302) =~ "/login"
  end

  test "GET /login diplay login page", %{conn: conn} do
    conn =
      conn
      |> get("/login")

    assert html_response(conn, 200)
  end

  test "GET github auth callback", %{conn: conn} do
    conn = get(conn, "/auth/github/callback?code=123123")
    assert redirected_to(conn, 302) =~ "/"
  end
end
