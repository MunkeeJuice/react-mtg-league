import { describe, it, expect } from 'vitest';
import data from './data.json';

describe('Game Data Validation', () => {
    it('should have exactly one player with starts set to true', () => {
        const startingPlayers = data.players.filter(player => player.starts === true);
        expect(startingPlayers.length).toBe(1);
    });

    it('should have all players with the same total number of games played', () => {
        const gameCounts = data.players.map(player => {
            const totalGames = player.first + player.second + player.third;
            return {
                name: player.name,
                totalGames
            };
        });

        // Get the first player's game count as reference
        const expectedGames = gameCounts[0].totalGames;

        // Check if all players have the same number of games
        gameCounts.forEach(player => {
            expect(player.totalGames).toBe(
                expectedGames,
                `${player.name} has ${player.totalGames} games, expected ${expectedGames}`
            );
        });
    });
});