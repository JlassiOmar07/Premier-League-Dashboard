package com.pl.premier_league.repos;

import com.pl.premier_league.entities.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {

    void deleteById(Long playerId);

    Optional<Player> findById(Long id);

    List<Player> findByTeam(String team);
    List<Player> findByPlayerContainingIgnoreCase(String player);
    List<Player> findByPositionContainingIgnoreCase(String position);
    List<Player> findByNationContainingIgnoreCase(String nation);
    List<Player> findByTeamAndPosition(String team, String position);



}
