package mefpai.gouv.sn.service.impl;

import java.util.Optional;
import mefpai.gouv.sn.domain.Materiel;
import mefpai.gouv.sn.repository.MaterielRepository;
import mefpai.gouv.sn.service.MaterielService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Materiel}.
 */
@Service
@Transactional
public class MaterielServiceImpl implements MaterielService {

    private final Logger log = LoggerFactory.getLogger(MaterielServiceImpl.class);

    private final MaterielRepository materielRepository;

    public MaterielServiceImpl(MaterielRepository materielRepository) {
        this.materielRepository = materielRepository;
    }

    @Override
    public Materiel save(Materiel materiel) {
        log.debug("Request to save Materiel : {}", materiel);
        return materielRepository.save(materiel);
    }

    @Override
    public Optional<Materiel> partialUpdate(Materiel materiel) {
        log.debug("Request to partially update Materiel : {}", materiel);

        return materielRepository
            .findById(materiel.getId())
            .map(
                existingMateriel -> {
                    if (materiel.getCategorieMateriel() != null) {
                        existingMateriel.setCategorieMateriel(materiel.getCategorieMateriel());
                    }
                    if (materiel.getEtatMateriel() != null) {
                        existingMateriel.setEtatMateriel(materiel.getEtatMateriel());
                    }

                    return existingMateriel;
                }
            )
            .map(materielRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Materiel> findAll(Pageable pageable) {
        log.debug("Request to get all Materiels");
        return materielRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Materiel> findOne(Long id) {
        log.debug("Request to get Materiel : {}", id);
        return materielRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Materiel : {}", id);
        materielRepository.deleteById(id);
    }
}
