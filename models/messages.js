const modelLeguends = {
    queryGetLegends: "SELECT * FROM Legends",
    queryGetLegendsByID: `SELECT * FROM Legends WHERE ID = ?`,
    queryDeleteLegendsByID: `UPDATE Legends SET Active = 'N' WHERE ID = ?`,
    queryAddLegends: `INSERT INTO Legends (Name, Description, Ability, Price, Damage, Ranges, Attack_Direction, Recharge, Family, Active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    queryLegendsExists: `SELECT * FROM Legends WHERE Name = ?`,
    queryUpdateLegendsByLegends: `UPDATE legends SET Name = ?, Description = ?, Ability = ?, Price = ?, Damage = ?, Ranges = ?, Attack_Direction = ?, Recharge = ?, Family = ? WHERE Name = ?`
}

module.exports = modelLeguends