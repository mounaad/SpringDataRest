package org.cours.springdatarest.web;


import org.cours.springdatarest.modele.Voiture;
import org.cours.springdatarest.modele.VoitureRepo;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/ai")
public class AiController {

    private final ChatClient chatClient;
    private final VoitureRepo voitureRepo;

    public AiController(ChatClient chatClient, VoitureRepo voitureRepo) {
        this.chatClient = chatClient;
        this.voitureRepo = voitureRepo;
    }

    // Description marketing d'une voiture par ID
    @GetMapping("/description/{id}")
    public String description(@PathVariable Long id) {
        Voiture v = voitureRepo.findById(id).orElse(null);
        if (v == null) return "Voiture introuvable";

        String prompt = """
                Fais une description marketing courte et attractive :
                %s %s, année %d, couleur %s, prix %d DH
                """.formatted(v.getMarque(), v.getModele(),
                v.getAnnee(), v.getCouleur(), v.getPrix());

        return chatClient.prompt()
                .user(prompt)
                .call()
                .content();
    }

    // Recommandation selon budget et usage
    @GetMapping("/recommande")
    public String recommandeVoiture(@RequestParam String budget,
                                    @RequestParam String usage) {
        List<Voiture> voitures = (List<Voiture>) voitureRepo.findAll();

        String prompt = """
                Voici les voitures disponibles : %s
                Budget : %s DH
                Usage : %s
                Donne la meilleure recommandation avec explication simple.
                """.formatted(voitures, budget, usage);

        return chatClient.prompt()
                .user(prompt)
                .call()
                .content();
    }

    // Chatbot général
    @PostMapping("/chat")
    public String chat(@RequestBody String question) {
        return chatClient.prompt()
                .user("Tu es un assistant spécialisé en voitures. " + question)
                .call()
                .content();
    }
}
