package org.cours.springdatarest.web;

import org.cours.springdatarest.modele.Voiture;
import org.cours.springdatarest.modele.VoitureRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/voitures")
public class VoitureController {

    @Autowired
    private VoitureRepo voitureRepo;

    // GET tous les voitures
    @GetMapping
    public Iterable<Voiture> getVoitures() {
        return voitureRepo.findAll();
    }

    // GET une voiture par id
    @GetMapping("/{id}")
    public Voiture getVoiture(@PathVariable Long id) {
        return voitureRepo.findById(id).orElse(null);
    }

    // POST ajouter une voiture
    @PostMapping
    public Voiture addVoiture(@RequestBody Voiture voiture) {
        return voitureRepo.save(voiture);
    }

    // PUT modifier une voiture
    @PutMapping("/{id}")
    public Voiture updateVoiture(@PathVariable Long id, @RequestBody Voiture voiture) {
        voiture.setId(id);
        return voitureRepo.save(voiture);
    }

    // DELETE supprimer une voiture
    @DeleteMapping("/{id}")
    public Voiture deleteVoiture(@PathVariable Long id) {
        Voiture voiture = voitureRepo.findById(id).orElse(null);
        if (voiture != null) {
            voitureRepo.deleteById(id);
        }
        return voiture;
    }
}