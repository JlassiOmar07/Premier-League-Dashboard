package com.pl.premier_league.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "player_data")
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String player;          // Player
    private String team;            // Team
    private Integer number;         // #

    private String nation;          // Nation
    private String position;        // Position

    // Age sous forme "29-343" => String
    private String age;             // Age (format "years-days")

    // Temps de jeu et contributions directes
    private Integer minutes;        // Minutes
    private Integer goals;          // Goals
    private Integer assists;        // Assists

    // Penalties & tirs
    private Integer penaltyShootOnGoal; // Penalty Shoot on Goal
    private Integer penaltyShoot;       // Penalty Shoot
    private Integer totalShoot;         // Total Shoot
    private Integer shootOnTarget;      // Shoot on Target

    // Discipline
    private Integer yellowCards;    // Yellow Cards
    private Integer redCards;       // Red Cards

    // Volumes de jeu
    private Integer touches;        // Touches
    private Integer dribbles;       // Dribbles
    private Integer tackles;        // Tackles
    private Integer blocks;         // Blocks

    // Stats avancées
    private Double xg;              // Expected Goals (xG)
    private Double npxg;            // Non-Penalty xG (npxG)
    private Double xag;             // Expected Assists (xAG)

    private Integer shotCreatingActions; // Shot-Creating Actions
    private Integer goalCreatingActions; // Goal-Creating Actions

    // Passes
    private Integer passesCompleted;    // Passes Completed
    private Integer passesAttempted;    // Passes Attempted
    private Double passCompletion;      // Pass Completion % (71,7 -> 71.7)

    // Progression / conduite
    private Integer progressivePasses;  // Progressive Passes
    private Integer carries;            // Carries
    private Integer progressiveCarries; // Progressive Carries
    private Integer dribbleAttempts;    // Dribble Attempts
    private Integer successfulDribbles; // Successful Dribbles

    private LocalDate date;

}
