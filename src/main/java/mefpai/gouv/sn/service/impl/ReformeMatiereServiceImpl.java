package mefpai.gouv.sn.service.impl;

import java.util.Optional;
import mefpai.gouv.sn.domain.ReformeMatiere;
import mefpai.gouv.sn.repository.ReformeMatiereRepository;
import mefpai.gouv.sn.service.ReformeMatiereService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link ReformeMatiere}.
 */
@Service
@Transactional
public class ReformeMatiereServiceImpl implements ReformeMatiereService {

    private final Logger log = LoggerFactory.getLogger(ReformeMatiereServiceImpl.class);

    private final ReformeMatiereRepository reformeMatiereRepository;

    public ReformeMatiereServiceImpl(ReformeMatiereRepository reformeMatiereRepository) {
        this.reformeMatiereRepository = reformeMatiereRepository;
    }

    @Override
    public ReformeMatiere save(ReformeMatiere reformeMatiere) {
        log.debug("Request to save ReformeMatiere : {}", reformeMatiere);
        return reformeMatiereRepository.save(reformeMatiere);
    }

    @Override
    public Optional<ReformeMatiere> partialUpdate(ReformeMatiere reformeMatiere) {
        log.debug("Request to partially update ReformeMatiere : {}", reformeMatiere);

        return reformeMatiereRepository
            .findById(reformeMatiere.getId())
            .map(
                existingReformeMatiere -> {
                    if (reformeMatiere.getGroup() != null) {
                        existingReformeMatiere.setGroup(reformeMatiere.getGroup());
                    }
                    if (reformeMatiere.getDesignationDesmembre() != null) {
                        existingReformeMatiere.setDesignationDesmembre(reformeMatiere.getDesignationDesmembre());
                    }
                    if (reformeMatiere.getDesignationDesmembreContentType() != null) {
                        existingReformeMatiere.setDesignationDesmembreContentType(reformeMatiere.getDesignationDesmembreContentType());
                    }
                    if (reformeMatiere.getPvReforme() != null) {
                        existingReformeMatiere.setPvReforme(reformeMatiere.getPvReforme());
                    }
                    if (reformeMatiere.getPvReformeContentType() != null) {
                        existingReformeMatiere.setPvReformeContentType(reformeMatiere.getPvReformeContentType());
                    }
                    if (reformeMatiere.getSortieDefinitive() != null) {
                        existingReformeMatiere.setSortieDefinitive(reformeMatiere.getSortieDefinitive());
                    }
                    if (reformeMatiere.getSortieDefinitiveContentType() != null) {
                        existingReformeMatiere.setSortieDefinitiveContentType(reformeMatiere.getSortieDefinitiveContentType());
                    }
                    if (reformeMatiere.getCertificatAdministratif() != null) {
                        existingReformeMatiere.setCertificatAdministratif(reformeMatiere.getCertificatAdministratif());
                    }
                    if (reformeMatiere.getCertificatAdministratifContentType() != null) {
                        existingReformeMatiere.setCertificatAdministratifContentType(
                            reformeMatiere.getCertificatAdministratifContentType()
                        );
                    }

                    return existingReformeMatiere;
                }
            )
            .map(reformeMatiereRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ReformeMatiere> findAll(Pageable pageable) {
        log.debug("Request to get all ReformeMatieres");
        return reformeMatiereRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ReformeMatiere> findByUserIsCurrentUser(Pageable pageable) {
        log.debug("Request to get all ReformeMatiere");
        return reformeMatiereRepository.findByUserIsCurrentUser(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ReformeMatiere> findOne(Long id) {
        log.debug("Request to get ReformeMatiere : {}", id);
        return reformeMatiereRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete ReformeMatiere : {}", id);
        reformeMatiereRepository.deleteById(id);
    }
}
