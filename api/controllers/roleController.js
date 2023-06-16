export async function updateUserRole(req, res) {
    try {
        const { userId, newRoleId } = req.body;

        if (!userId || !newRoleId) {
            return res.status(400).json({ message: "User ID and new role ID are required" });
        }

        await db.query(
            "UPDATE users SET role_id = ? WHERE id = ?",
            [newRoleId, userId],
            (error, results, fields) => {
                if (error) {
                    throw error;
                }

                if (results.affectedRows === 0) {
                    res.status(404).json({ message: "User not found" });
                } else {
                    res.status(200).json({ message: "User role updated successfully" });
                }
            }
        );
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}