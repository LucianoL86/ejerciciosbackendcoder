const logout = document.getElementById("logout");
logout.addEventListener("click", async () => {
    await fetch("/logout", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    window.location.href = "/login";
});