package com.pl.premier_league.services;

import com.pl.premier_league.entities.Player;
import com.pl.premier_league.repos.PlayerRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class PlayerService {

    private final PlayerRepository playerRepository;

    @Autowired
    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public List<Player> getPlayers() {
        return playerRepository.findAll();
    }

    public List<Player> getPlayersByName(String searchText) {
        return playerRepository.findByPlayerContainingIgnoreCase(searchText);
    }

    public List<Player> getPlayersByTeam(String teamName) {
        return playerRepository.findByTeam(teamName);
    }

    public List<Player> getPlayersByPos(String searchText) {
        return playerRepository.findByPositionContainingIgnoreCase(searchText);
    }

    public List<Player> getPlayersByNation(String searchText) {
        return playerRepository.findByNationContainingIgnoreCase(searchText);
    }

    public List<Player> getPlayersByTeamAndPosition(String team, String position){
        return playerRepository.findByTeamAndPosition(team, position);
    }
    public Player addPlayer(Player player) {
        playerRepository.save(player);
        return player;
    }

    public Player updatePlayer(Player updatedPlayer) {
        Optional<Player> existingPlayer = playerRepository.findById(updatedPlayer.getId());

        if (existingPlayer.isPresent()) {
            Player playerToUpdate = existingPlayer.get();
            playerToUpdate.setPlayer(updatedPlayer.getPlayer());
            playerToUpdate.setTeam(updatedPlayer.getTeam());
            playerToUpdate.setPosition(updatedPlayer.getPosition());
            playerToUpdate.setNation(updatedPlayer.getNation());
            playerToUpdate.setAge(updatedPlayer.getAge());
            playerToUpdate.setMinutes(updatedPlayer.getMinutes());
            playerToUpdate.setGoals(updatedPlayer.getGoals());
            playerToUpdate.setAssists(updatedPlayer.getAssists());
            playerToUpdate.setYellowCards(updatedPlayer.getYellowCards());
            playerToUpdate.setRedCards(updatedPlayer.getRedCards());
            playerToUpdate.setTouches(updatedPlayer.getTouches());
            playerToUpdate.setDribbles(updatedPlayer.getDribbles());
            playerToUpdate.setTackles(updatedPlayer.getTackles());
            playerToUpdate.setBlocks(updatedPlayer.getBlocks());
            playerToUpdate.setXg(updatedPlayer.getXg());
            playerToUpdate.setNpxg(updatedPlayer.getNpxg());
            playerToUpdate.setXag(updatedPlayer.getXag());
            playerToUpdate.setShotCreatingActions(updatedPlayer.getShotCreatingActions());
            playerToUpdate.setGoalCreatingActions(updatedPlayer.getGoalCreatingActions());
            playerToUpdate.setPassesCompleted(updatedPlayer.getPassesCompleted());
            playerToUpdate.setPassesAttempted(updatedPlayer.getPassesAttempted());
            playerToUpdate.setPenaltyShootOnGoal(updatedPlayer.getPenaltyShootOnGoal());
            playerToUpdate.setPenaltyShoot(updatedPlayer.getPenaltyShoot());
            playerToUpdate.setTotalShoot(updatedPlayer.getTotalShoot());
            playerToUpdate.setShootOnTarget(updatedPlayer.getShootOnTarget());
            playerToUpdate.setNumber(updatedPlayer.getNumber());
            playerRepository.save(playerToUpdate);
            return playerToUpdate;
        }
        return null;
    }

    @Transactional
    public void deletePlayer(Long playerId) {
        playerRepository.deleteById(playerId);
    }

}
