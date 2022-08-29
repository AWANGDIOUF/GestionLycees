package mefpai.gouv.sn.service.impl;

import java.util.Optional;
import mefpai.gouv.sn.domain.MouvementMatiere;
import mefpai.gouv.sn.repository.MouvementMatiereRepository;
import mefpai.gouv.sn.service.MouvementMatiereService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link MouvementMatiere}.
 */
@Service
@Transactional
public class MouvementMatiereServiceImpl implements MouvementMatiereService {

    private final Logger log = LoggerFactory.getLogger(MouvementMatiereServiceImpl.class);

    private final MouvementMatiereRepository mouvementMatiereRepository;

    public MouvementMatiereServiceImpl(MouvementMatiereRepository mouvementMatiereRepository) {
        this.mouvementMatiereRepository = mouvementMatiereRepository;
    }

    @Override
    public MouvementMatiere save(MouvementMatiere mouvementMatiere) {
        log.debug("Request to save MouvementMatiere : {}", mouvementMatiere);
        return mouvementMatiereRepository.save(mouvementMatiere);
    }

    @Override
    public Optional<MouvementMatiere> partialUpdate(MouvementMatiere mouvementMatiere) {
        log.debug("Request to partially update MouvementMatiere : {}", mouvementMatiere);

        return mouvementMatiereRepository
            .findById(mouvementMatiere.getId())
            .map(
                existingMouvementMatiere -> {
                    if (mouvementMatiere.getTypeMouvement() != null) {
                        existingMouvementMatiere.setTypeMouvement(mouvementMatiere.getTypeMouvement());
                    }
                    if (mouvementMatiere.getGroup() != null) {
                        existingMouvementMatiere.setGroup(mouvementMatiere.getGroup());
                    }
                    if (mouvementMatiere.getOrganisation() != null) {
                        existingMouvementMatiere.setOrganisation(mouvementMatiere.getOrganisation());
                    }
                    if (mouvementMatiere.getAutreOrganisation() != null) {
                        existingMouvementMatiere.setAutreOrganisation(mouvementMatiere.getAutreOrganisation());
                    }
                    if (mouvementMatiere.getRessource() != null) {
                        existingMouvementMatiere.setRessource(mouvementMatiere.getRessource());
                    }
                    if (mouvementMatiere.getAutreRessource() != null) {
                        existingMouvementMatiere.setAutreRessource(mouvementMatiere.getAutreRessource());
                    }
                    if (mouvementMatiere.getDesignation() != null) {
                        existingMouvementMatiere.setDesignation(mouvementMatiere.getDesignation());
                    }
                    if (mouvementMatiere.getDesignationContentType() != null) {
                        existingMouvementMatiere.setDesignationContentType(mouvementMatiere.getDesignationContentType());
                    }
                    if (mouvementMatiere.getPvReception() != null) {
                        existingMouvementMatiere.setPvReception(mouvementMatiere.getPvReception());
                    }
                    if (mouvementMatiere.getPvReceptionContentType() != null) {
                        existingMouvementMatiere.setPvReceptionContentType(mouvementMatiere.getPvReceptionContentType());
                    }
                    if (mouvementMatiere.getBordeauDeLivraison() != null) {
                        existingMouvementMatiere.setBordeauDeLivraison(mouvementMatiere.getBordeauDeLivraison());
                    }
                    if (mouvementMatiere.getBordeauDeLivraisonContentType() != null) {
                        existingMouvementMatiere.setBordeauDeLivraisonContentType(mouvementMatiere.getBordeauDeLivraisonContentType());
                    }
                    if (mouvementMatiere.getGroupe() != null) {
                        existingMouvementMatiere.setGroupe(mouvementMatiere.getGroupe());
                    }
                    if (mouvementMatiere.getBonDeSortie() != null) {
                        existingMouvementMatiere.setBonDeSortie(mouvementMatiere.getBonDeSortie());
                    }
                    if (mouvementMatiere.getBonDeSortieContentType() != null) {
                        existingMouvementMatiere.setBonDeSortieContentType(mouvementMatiere.getBonDeSortieContentType());
                    }
                    if (mouvementMatiere.getCertificatAdministratif() != null) {
                        existingMouvementMatiere.setCertificatAdministratif(mouvementMatiere.getCertificatAdministratif());
                    }
                    if (mouvementMatiere.getCertificatAdministratifContentType() != null) {
                        existingMouvementMatiere.setCertificatAdministratifContentType(
                            mouvementMatiere.getCertificatAdministratifContentType()
                        );
                    }

                    return existingMouvementMatiere;
                }
            )
            .map(mouvementMatiereRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<MouvementMatiere> findAll(Pageable pageable) {
        log.debug("Request to get all MouvementMatieres");
        return mouvementMatiereRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<MouvementMatiere> findByUserIsCurrentUser(Pageable pageable) {
        log.debug("Request to get all MouvementMatiere");
        return mouvementMatiereRepository.findByUserIsCurrentUser(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<MouvementMatiere> findOne(Long id) {
        log.debug("Request to get MouvementMatiere : {}", id);
        return mouvementMatiereRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete MouvementMatiere : {}", id);
        mouvementMatiereRepository.deleteById(id);
    }
}
