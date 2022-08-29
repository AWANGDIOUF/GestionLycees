package mefpai.gouv.sn.config;

import java.time.Duration;
import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;
import org.hibernate.cache.jcache.ConfigSettings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.boot.info.BuildProperties;
import org.springframework.boot.info.GitProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.context.annotation.*;
import tech.jhipster.config.JHipsterProperties;
import tech.jhipster.config.cache.PrefixedKeyGenerator;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private GitProperties gitProperties;
    private BuildProperties buildProperties;
    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration =
            Eh107Configuration.fromEhcacheCacheConfiguration(
                CacheConfigurationBuilder
                    .newCacheConfigurationBuilder(Object.class, Object.class, ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                    .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                    .build()
            );
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, mefpai.gouv.sn.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, mefpai.gouv.sn.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, mefpai.gouv.sn.domain.User.class.getName());
            createCache(cm, mefpai.gouv.sn.domain.Authority.class.getName());
            createCache(cm, mefpai.gouv.sn.domain.User.class.getName() + ".authorities");
            createCache(cm, mefpai.gouv.sn.domain.Apprenant.class.getName());
            createCache(cm, mefpai.gouv.sn.domain.Besoin.class.getName());
            createCache(cm, mefpai.gouv.sn.domain.Recette.class.getName());
            createCache(cm, mefpai.gouv.sn.domain.Recette.class.getName() + ".depenses");
            createCache(cm, mefpai.gouv.sn.domain.NiveauxEtudes.class.getName());
            createCache(cm, mefpai.gouv.sn.domain.NiveauxEtudes.class.getName() + ".enseignants");
            createCache(cm, mefpai.gouv.sn.domain.Enseignant.class.getName());
            createCache(cm, mefpai.gouv.sn.domain.Enseignant.class.getName() + ".niveauxEtudes");
            createCache(cm, mefpai.gouv.sn.domain.Enseignant.class.getName() + ".series");
            createCache(cm, mefpai.gouv.sn.domain.Enseignant.class.getName() + ".filieres");
            createCache(cm, mefpai.gouv.sn.domain.Examen.class.getName());
            createCache(cm, mefpai.gouv.sn.domain.Filiere.class.getName());
            createCache(cm, mefpai.gouv.sn.domain.Filiere.class.getName() + ".niveaus");
            createCache(cm, mefpai.gouv.sn.domain.Filiere.class.getName() + ".enseignants");
            createCache(cm, mefpai.gouv.sn.domain.Localisation.class.getName());
            createCache(cm, mefpai.gouv.sn.domain.Materiel.class.getName());
            createCache(cm, mefpai.gouv.sn.domain.Partenaire.class.getName());
            createCache(cm, mefpai.gouv.sn.domain.PersonnelAdministratif.class.getName());
            createCache(cm, mefpai.gouv.sn.domain.PersonnelAppui.class.getName());
            createCache(cm, mefpai.gouv.sn.domain.LyceeTechnique.class.getName());
            createCache(cm, mefpai.gouv.sn.domain.LyceeTechnique.class.getName() + ".examen");
            createCache(cm, mefpai.gouv.sn.domain.LyceeTechnique.class.getName() + ".recettes");
            createCache(cm, mefpai.gouv.sn.domain.LyceeTechnique.class.getName() + ".visites");
            createCache(cm, mefpai.gouv.sn.domain.LyceeTechnique.class.getName() + ".materiels");
            createCache(cm, mefpai.gouv.sn.domain.LyceeTechnique.class.getName() + ".besoins");
            createCache(cm, mefpai.gouv.sn.domain.LyceeTechnique.class.getName() + ".personnelAdmiistratifs");
            createCache(cm, mefpai.gouv.sn.domain.LyceeTechnique.class.getName() + ".personnelAppuis");
            createCache(cm, mefpai.gouv.sn.domain.LyceeTechnique.class.getName() + ".series");
            createCache(cm, mefpai.gouv.sn.domain.LyceeTechnique.class.getName() + ".filieres");
            createCache(cm, mefpai.gouv.sn.domain.LyceeTechnique.class.getName() + ".salles");
            createCache(cm, mefpai.gouv.sn.domain.LyceeTechnique.class.getName() + ".apprenants");
            createCache(cm, mefpai.gouv.sn.domain.LyceeTechnique.class.getName() + ".enseignants");
            createCache(cm, mefpai.gouv.sn.domain.LyceeTechnique.class.getName() + ".partenaires");
            createCache(cm, mefpai.gouv.sn.domain.Salle.class.getName());
            createCache(cm, mefpai.gouv.sn.domain.Serie.class.getName());
            createCache(cm, mefpai.gouv.sn.domain.Serie.class.getName() + ".niveaus");
            createCache(cm, mefpai.gouv.sn.domain.Serie.class.getName() + ".enseignants");
            createCache(cm, mefpai.gouv.sn.domain.Depense.class.getName());
            createCache(cm, mefpai.gouv.sn.domain.Depense.class.getName() + ".recettes");
            createCache(cm, mefpai.gouv.sn.domain.Visite.class.getName());
            createCache(cm, mefpai.gouv.sn.domain.Filiere.class.getName() + ".programmes");
            createCache(cm, mefpai.gouv.sn.domain.Programme.class.getName());
            createCache(cm, mefpai.gouv.sn.domain.Programme.class.getName() + ".niveaus");
            createCache(cm, mefpai.gouv.sn.domain.LyceeTechnique.class.getName() + ".statuses");
            createCache(cm, mefpai.gouv.sn.domain.Programme.class.getName() + ".niveauEtudes");
            createCache(cm, mefpai.gouv.sn.domain.Programme.class.getName() + ".niveauCalifications");
            createCache(cm, mefpai.gouv.sn.domain.NiveauxCalification.class.getName());
            createCache(cm, mefpai.gouv.sn.domain.Reception.class.getName());
            createCache(cm, mefpai.gouv.sn.domain.Reception.class.getName() + ".materiels");
            createCache(cm, mefpai.gouv.sn.domain.Reception.class.getName() + ".attributions");
            createCache(cm, mefpai.gouv.sn.domain.Attribution.class.getName());
            createCache(cm, mefpai.gouv.sn.domain.OrganeGestion.class.getName());
            createCache(cm, mefpai.gouv.sn.domain.LyceesTechniques.class.getName());
            createCache(cm, mefpai.gouv.sn.domain.LyceesTechniques.class.getName() + ".examen");
            createCache(cm, mefpai.gouv.sn.domain.LyceesTechniques.class.getName() + ".recettes");
            createCache(cm, mefpai.gouv.sn.domain.LyceesTechniques.class.getName() + ".visites");
            createCache(cm, mefpai.gouv.sn.domain.LyceesTechniques.class.getName() + ".organeGestions");
            createCache(cm, mefpai.gouv.sn.domain.LyceesTechniques.class.getName() + ".materiels");
            createCache(cm, mefpai.gouv.sn.domain.LyceesTechniques.class.getName() + ".besoins");
            createCache(cm, mefpai.gouv.sn.domain.LyceesTechniques.class.getName() + ".personnelAdmiistratifs");
            createCache(cm, mefpai.gouv.sn.domain.LyceesTechniques.class.getName() + ".personnelAppuis");
            createCache(cm, mefpai.gouv.sn.domain.LyceesTechniques.class.getName() + ".series");
            createCache(cm, mefpai.gouv.sn.domain.LyceesTechniques.class.getName() + ".filieres");
            createCache(cm, mefpai.gouv.sn.domain.LyceesTechniques.class.getName() + ".salles");
            createCache(cm, mefpai.gouv.sn.domain.LyceesTechniques.class.getName() + ".apprenants");
            createCache(cm, mefpai.gouv.sn.domain.LyceesTechniques.class.getName() + ".enseignants");
            createCache(cm, mefpai.gouv.sn.domain.LyceesTechniques.class.getName() + ".lycees");
            createCache(cm, mefpai.gouv.sn.domain.LyceesTechniques.class.getName() + ".partenaires");
            createCache(cm, mefpai.gouv.sn.domain.Proviseur.class.getName());
            createCache(cm, mefpai.gouv.sn.domain.DirecteurEtude.class.getName());
            createCache(cm, mefpai.gouv.sn.domain.ComptableMatiere.class.getName());
            createCache(cm, mefpai.gouv.sn.domain.ComptableFinancier.class.getName());
            createCache(cm, mefpai.gouv.sn.domain.Proviseur.class.getName() + ".localisations");
            createCache(cm, mefpai.gouv.sn.domain.Proviseur.class.getName() + ".lycees");
            createCache(cm, mefpai.gouv.sn.domain.Proviseur.class.getName() + ".personnelAdmiistratifs");
            createCache(cm, mefpai.gouv.sn.domain.Proviseur.class.getName() + ".partenaires");
            createCache(cm, mefpai.gouv.sn.domain.Proviseur.class.getName() + ".besoins");/*  */
            createCache(cm, mefpai.gouv.sn.domain.Proviseur.class.getName() + ".visites");
            createCache(cm, mefpai.gouv.sn.domain.DirecteurEtude.class.getName() + ".salles");
            createCache(cm, mefpai.gouv.sn.domain.DirecteurEtude.class.getName() + ".series");
            createCache(cm, mefpai.gouv.sn.domain.DirecteurEtude.class.getName() + ".niveaus");
            createCache(cm, mefpai.gouv.sn.domain.DirecteurEtude.class.getName() + ".filieres");
            createCache(cm, mefpai.gouv.sn.domain.DirecteurEtude.class.getName() + ".programmes");
            createCache(cm, mefpai.gouv.sn.domain.DirecteurEtude.class.getName() + ".niveauCalifications");
            createCache(cm, mefpai.gouv.sn.domain.DirecteurEtude.class.getName() + ".apprenants");
            createCache(cm, mefpai.gouv.sn.domain.DirecteurEtude.class.getName() + ".enseignants");
            createCache(cm, mefpai.gouv.sn.domain.DirecteurEtude.class.getName() + ".examen");
            createCache(cm, mefpai.gouv.sn.domain.ComptableMatiere.class.getName() + ".receptions");
            createCache(cm, mefpai.gouv.sn.domain.ComptableMatiere.class.getName() + ".materiels");
            createCache(cm, mefpai.gouv.sn.domain.ComptableMatiere.class.getName() + ".attributions");
            createCache(cm, mefpai.gouv.sn.domain.ComptableFinancier.class.getName() + ".personnelAppuis");
            createCache(cm, mefpai.gouv.sn.domain.ComptableFinancier.class.getName() + ".recettes");
            createCache(cm, mefpai.gouv.sn.domain.ComptableFinancier.class.getName() + ".depenses");
            createCache(cm, mefpai.gouv.sn.domain.LyceesTechniques.class.getName() + ".localisations");
            createCache(cm, mefpai.gouv.sn.domain.Difficulte.class.getName());
            createCache(cm, mefpai.gouv.sn.domain.LyceesTechniques.class.getName() + ".proviseurs");
            createCache(cm, mefpai.gouv.sn.domain.LyceesTechniques.class.getName() + ".directeurEtudes");
            createCache(cm, mefpai.gouv.sn.domain.LyceesTechniques.class.getName() + ".comptableFinanciers");
            createCache(cm, mefpai.gouv.sn.domain.LyceesTechniques.class.getName() + ".comptableMatieres");
            createCache(cm, mefpai.gouv.sn.domain.Proviseur.class.getName() + ".salles");
            createCache(cm, mefpai.gouv.sn.domain.Proviseur.class.getName() + ".series");
            createCache(cm, mefpai.gouv.sn.domain.Proviseur.class.getName() + ".niveaus");
            createCache(cm, mefpai.gouv.sn.domain.Proviseur.class.getName() + ".filieres");
            createCache(cm, mefpai.gouv.sn.domain.Proviseur.class.getName() + ".programmes");
            createCache(cm, mefpai.gouv.sn.domain.Proviseur.class.getName() + ".niveauCalifications");
            createCache(cm, mefpai.gouv.sn.domain.Proviseur.class.getName() + ".apprenants");
            createCache(cm, mefpai.gouv.sn.domain.Proviseur.class.getName() + ".enseignants");
            createCache(cm, mefpai.gouv.sn.domain.Proviseur.class.getName() + ".examen");
            createCache(cm, mefpai.gouv.sn.domain.Proviseur.class.getName() + ".personnelAppuis");
            createCache(cm, mefpai.gouv.sn.domain.Proviseur.class.getName() + ".recettes");
            createCache(cm, mefpai.gouv.sn.domain.Proviseur.class.getName() + ".depenses");
            createCache(cm, mefpai.gouv.sn.domain.Proviseur.class.getName() + ".receptions");
            createCache(cm, mefpai.gouv.sn.domain.Proviseur.class.getName() + ".materiels");
            createCache(cm, mefpai.gouv.sn.domain.Proviseur.class.getName() + ".attributions");
            createCache(cm, mefpai.gouv.sn.domain.LyceesTechniques.class.getName() + ".difficultes");
            createCache(cm, mefpai.gouv.sn.domain.Proviseur.class.getName() + ".difficultes");
            createCache(cm, mefpai.gouv.sn.domain.LyceesTechniques.class.getName() + ".depenses");
            createCache(cm, mefpai.gouv.sn.domain.LyceesTechniques.class.getName() + ".organes");
            createCache(cm, mefpai.gouv.sn.domain.LyceesTechniques.class.getName() + ".niveaucalifications");
            createCache(cm, mefpai.gouv.sn.domain.LyceesTechniques.class.getName() + ".attributions");
            createCache(cm, mefpai.gouv.sn.domain.LyceesTechniques.class.getName() + ".receptions");
            createCache(cm, mefpai.gouv.sn.domain.LyceesTechniques.class.getName() + ".programmes");
            createCache(cm, mefpai.gouv.sn.domain.LyceesTechniques.class.getName() + ".niveauetudes");
            createCache(cm, mefpai.gouv.sn.domain.Proviseur.class.getName() + ".organes");
            createCache(cm, mefpai.gouv.sn.domain.Apprenant.class.getName() + ".examen");
            createCache(cm, mefpai.gouv.sn.domain.Filiere.class.getName() + ".examen");
            // createCache(cm, mefpai.gouv.sn.domain.Organe.class.getName());
            // createCache(cm, mefpai.gouv.sn.domain.Probleme.class.getName());
            // createCache(cm, mefpai.gouv.sn.domain.Serie.class.getName() + ".examen");
            // createCache(cm, mefpai.gouv.sn.domain.Bon.class.getName());
            // createCache(cm, mefpai.gouv.sn.domain.Status.class.getName());
            createCache(cm, mefpai.gouv.sn.domain.LyceesTechniques.class.getName() + ".concours");
            createCache(cm, mefpai.gouv.sn.domain.LyceesTechniques.class.getName() + ".formations");
            createCache(cm, mefpai.gouv.sn.domain.LyceesTechniques.class.getName() + ".mouvementMatieres");
            createCache(cm, mefpai.gouv.sn.domain.LyceesTechniques.class.getName() + ".reformeMatieres");
            createCache(cm, mefpai.gouv.sn.domain.LyceesTechniques.class.getName() + ".iventaireDesMatetieres");
            createCache(cm, mefpai.gouv.sn.domain.DirecteurEtude.class.getName() + ".concours");
            createCache(cm, mefpai.gouv.sn.domain.DirecteurEtude.class.getName() + ".formations");
            createCache(cm, mefpai.gouv.sn.domain.ComptableMatiere.class.getName() + ".iventaireDesMatetieres");
            createCache(cm, mefpai.gouv.sn.domain.ComptableMatiere.class.getName() + ".mouvementMatieres");
            createCache(cm, mefpai.gouv.sn.domain.ComptableMatiere.class.getName() + ".reformeMatieres");
            createCache(cm, mefpai.gouv.sn.domain.IventaireDesMatetiere.class.getName());
            createCache(cm, mefpai.gouv.sn.domain.MouvementMatiere.class.getName());
            createCache(cm, mefpai.gouv.sn.domain.ReformeMatiere.class.getName());
            createCache(cm, mefpai.gouv.sn.domain.Concours.class.getName());
            createCache(cm, mefpai.gouv.sn.domain.Formation.class.getName());
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cache.clear();
        } else {
            cm.createCache(cacheName, jcacheConfiguration);
        }
    }

    @Autowired(required = false)
    public void setGitProperties(GitProperties gitProperties) {
        this.gitProperties = gitProperties;
    }

    @Autowired(required = false)
    public void setBuildProperties(BuildProperties buildProperties) {
        this.buildProperties = buildProperties;
    }

    @Bean
    public KeyGenerator keyGenerator() {
        return new PrefixedKeyGenerator(this.gitProperties, this.buildProperties);
    }
}
