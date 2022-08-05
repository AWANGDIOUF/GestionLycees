package mefpai.gouv.sn.service.impl;

import java.util.Optional;
import mefpai.gouv.sn.domain.LyceeTechnique;
import mefpai.gouv.sn.repository.LyceeTechniqueRepository;
import mefpai.gouv.sn.service.LyceeTechniqueService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link LyceeTechnique}.
 */
@Service
@Transactional
public class LyceeTechniqueServiceImpl implements LyceeTechniqueService {

    private final Logger log = LoggerFactory.getLogger(LyceeTechniqueServiceImpl.class);

    private final LyceeTechniqueRepository lyceeTechniqueRepository;

    public LyceeTechniqueServiceImpl(LyceeTechniqueRepository lyceeTechniqueRepository) {
        this.lyceeTechniqueRepository = lyceeTechniqueRepository;
    }

    @Override
    public LyceeTechnique save(LyceeTechnique lyceeTechnique) {
        log.debug("Request to save LyceeTechnique : {}", lyceeTechnique);
        return lyceeTechniqueRepository.save(lyceeTechnique);
    }

    @Override
    public Optional<LyceeTechnique> partialUpdate(LyceeTechnique lyceeTechnique) {
        log.debug("Request to partially update LyceeTechnique : {}", lyceeTechnique);

        return lyceeTechniqueRepository
            .findById(lyceeTechnique.getId())
            .map(
                existingLyceeTechnique -> {
                    if (lyceeTechnique.getPrenomNom() != null) {
                        existingLyceeTechnique.setPrenomNom(lyceeTechnique.getPrenomNom());
                    }
                    if (lyceeTechnique.getAdresse() != null) {
                        existingLyceeTechnique.setAdresse(lyceeTechnique.getAdresse());
                    }
                    if (lyceeTechnique.getMail() != null) {
                        existingLyceeTechnique.setMail(lyceeTechnique.getMail());
                    }
                    if (lyceeTechnique.getTel1() != null) {
                        existingLyceeTechnique.setTel1(lyceeTechnique.getTel1());
                    }
                    if (lyceeTechnique.getTel2() != null) {
                        existingLyceeTechnique.setTel2(lyceeTechnique.getTel2());
                    }
                    if (lyceeTechnique.getBoitePostal() != null) {
                        existingLyceeTechnique.setBoitePostal(lyceeTechnique.getBoitePostal());
                    }
                    if (lyceeTechnique.getDecretCreation() != null) {
                        existingLyceeTechnique.setDecretCreation(lyceeTechnique.getDecretCreation());
                    }
                    if (lyceeTechnique.getDateCreation() != null) {
                        existingLyceeTechnique.setDateCreation(lyceeTechnique.getDateCreation());
                    }
                    if (lyceeTechnique.getRegion() != null) {
                        existingLyceeTechnique.setRegion(lyceeTechnique.getRegion());
                    }
                    if (lyceeTechnique.getAutreRegion() != null) {
                        existingLyceeTechnique.setAutreRegion(lyceeTechnique.getAutreRegion());
                    }
                    if (lyceeTechnique.getDepartementDakar() != null) {
                        existingLyceeTechnique.setDepartementDakar(lyceeTechnique.getDepartementDakar());
                    }
                    if (lyceeTechnique.getDepartementDiourbel() != null) {
                        existingLyceeTechnique.setDepartementDiourbel(lyceeTechnique.getDepartementDiourbel());
                    }
                    if (lyceeTechnique.getDepartementFatick() != null) {
                        existingLyceeTechnique.setDepartementFatick(lyceeTechnique.getDepartementFatick());
                    }
                    if (lyceeTechnique.getDepartementKaffrine() != null) {
                        existingLyceeTechnique.setDepartementKaffrine(lyceeTechnique.getDepartementKaffrine());
                    }
                    if (lyceeTechnique.getDepartementKaolack() != null) {
                        existingLyceeTechnique.setDepartementKaolack(lyceeTechnique.getDepartementKaolack());
                    }
                    if (lyceeTechnique.getDepartementKedougou() != null) {
                        existingLyceeTechnique.setDepartementKedougou(lyceeTechnique.getDepartementKedougou());
                    }
                    if (lyceeTechnique.getDepartementKolda() != null) {
                        existingLyceeTechnique.setDepartementKolda(lyceeTechnique.getDepartementKolda());
                    }
                    if (lyceeTechnique.getDepartementLouga() != null) {
                        existingLyceeTechnique.setDepartementLouga(lyceeTechnique.getDepartementLouga());
                    }
                    if (lyceeTechnique.getDepartementMatam() != null) {
                        existingLyceeTechnique.setDepartementMatam(lyceeTechnique.getDepartementMatam());
                    }
                    if (lyceeTechnique.getDepartementSaint() != null) {
                        existingLyceeTechnique.setDepartementSaint(lyceeTechnique.getDepartementSaint());
                    }
                    if (lyceeTechnique.getDepartementSedhiou() != null) {
                        existingLyceeTechnique.setDepartementSedhiou(lyceeTechnique.getDepartementSedhiou());
                    }
                    if (lyceeTechnique.getDepartementTambacounda() != null) {
                        existingLyceeTechnique.setDepartementTambacounda(lyceeTechnique.getDepartementTambacounda());
                    }
                    if (lyceeTechnique.getDepartementThis() != null) {
                        existingLyceeTechnique.setDepartementThis(lyceeTechnique.getDepartementThis());
                    }
                    if (lyceeTechnique.getDepartementZiguinchor() != null) {
                        existingLyceeTechnique.setDepartementZiguinchor(lyceeTechnique.getDepartementZiguinchor());
                    }
                    if (lyceeTechnique.getAutredepartementDakar() != null) {
                        existingLyceeTechnique.setAutredepartementDakar(lyceeTechnique.getAutredepartementDakar());
                    }
                    if (lyceeTechnique.getAutredepartementDiourbel() != null) {
                        existingLyceeTechnique.setAutredepartementDiourbel(lyceeTechnique.getAutredepartementDiourbel());
                    }
                    if (lyceeTechnique.getAutredepartementFatick() != null) {
                        existingLyceeTechnique.setAutredepartementFatick(lyceeTechnique.getAutredepartementFatick());
                    }
                    if (lyceeTechnique.getAutredepartementKaffrine() != null) {
                        existingLyceeTechnique.setAutredepartementKaffrine(lyceeTechnique.getAutredepartementKaffrine());
                    }
                    if (lyceeTechnique.getAutredepartementKaolack() != null) {
                        existingLyceeTechnique.setAutredepartementKaolack(lyceeTechnique.getAutredepartementKaolack());
                    }
                    if (lyceeTechnique.getAutredepartementKedougou() != null) {
                        existingLyceeTechnique.setAutredepartementKedougou(lyceeTechnique.getAutredepartementKedougou());
                    }
                    if (lyceeTechnique.getAutredepartementKolda() != null) {
                        existingLyceeTechnique.setAutredepartementKolda(lyceeTechnique.getAutredepartementKolda());
                    }
                    if (lyceeTechnique.getAutredepartementLouga() != null) {
                        existingLyceeTechnique.setAutredepartementLouga(lyceeTechnique.getAutredepartementLouga());
                    }
                    if (lyceeTechnique.getAutredepartementMatam() != null) {
                        existingLyceeTechnique.setAutredepartementMatam(lyceeTechnique.getAutredepartementMatam());
                    }
                    if (lyceeTechnique.getAutredepartementSaint() != null) {
                        existingLyceeTechnique.setAutredepartementSaint(lyceeTechnique.getAutredepartementSaint());
                    }
                    if (lyceeTechnique.getAutredepartementSedhiou() != null) {
                        existingLyceeTechnique.setAutredepartementSedhiou(lyceeTechnique.getAutredepartementSedhiou());
                    }
                    if (lyceeTechnique.getAutredepartementTambacounda() != null) {
                        existingLyceeTechnique.setAutredepartementTambacounda(lyceeTechnique.getAutredepartementTambacounda());
                    }
                    if (lyceeTechnique.getAutredepartementThis() != null) {
                        existingLyceeTechnique.setAutredepartementThis(lyceeTechnique.getAutredepartementThis());
                    }
                    if (lyceeTechnique.getAutredepartementZiguinchor() != null) {
                        existingLyceeTechnique.setAutredepartementZiguinchor(lyceeTechnique.getAutredepartementZiguinchor());
                    }
                    if (lyceeTechnique.getCommune() != null) {
                        existingLyceeTechnique.setCommune(lyceeTechnique.getCommune());
                    }
                    if (lyceeTechnique.getIa() != null) {
                        existingLyceeTechnique.setIa(lyceeTechnique.getIa());
                    }

                    return existingLyceeTechnique;
                }
            )
            .map(lyceeTechniqueRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<LyceeTechnique> findAll(Pageable pageable) {
        log.debug("Request to get all LyceeTechniques");
        return lyceeTechniqueRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<LyceeTechnique> findByUserIsCurrentUser(Pageable pageable) {
        log.debug("Request to get all LyceeTechniques");
        return lyceeTechniqueRepository.findByUserIsCurrentUser(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<LyceeTechnique> findOne(Long id) {
        log.debug("Request to get LyceeTechnique : {}", id);
        return lyceeTechniqueRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete LyceeTechnique : {}", id);
        lyceeTechniqueRepository.deleteById(id);
    }
}
