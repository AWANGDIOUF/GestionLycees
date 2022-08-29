package mefpai.gouv.sn.service.impl;

import java.util.Optional;
import mefpai.gouv.sn.domain.Reception;
import mefpai.gouv.sn.repository.ReceptionRepository;
import mefpai.gouv.sn.service.ReceptionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Reception}.
 */
@Service
@Transactional
public class ReceptionServiceImpl implements ReceptionService {

    private final Logger log = LoggerFactory.getLogger(ReceptionServiceImpl.class);

    private final ReceptionRepository receptionRepository;

    public ReceptionServiceImpl(ReceptionRepository receptionRepository) {
        this.receptionRepository = receptionRepository;
    }

    @Override
    public Reception save(Reception reception) {
        log.debug("Request to save Reception : {}", reception);
        return receptionRepository.save(reception);
    }

    @Override
    public Optional<Reception> partialUpdate(Reception reception) {
        log.debug("Request to partially update Reception : {}", reception);

        return receptionRepository
            .findById(reception.getId())
            .map(
                existingReception -> {
                    if (reception.getLibelleMateriel() != null) {
                        existingReception.setLibelleMateriel(reception.getLibelleMateriel());
                    }
                    if (reception.getTypeGroup() != null) {
                        existingReception.setTypeGroup(reception.getTypeGroup());
                    }
                    if (reception.getProvenance() != null) {
                        existingReception.setProvenance(reception.getProvenance());
                    }
                    if (reception.getFournisseur() != null) {
                        existingReception.setFournisseur(reception.getFournisseur());
                    }
                    if (reception.getDate() != null) {
                        existingReception.setDate(reception.getDate());
                    }

                    return existingReception;
                }
            )
            .map(receptionRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Reception> findAll(Pageable pageable) {
        log.debug("Request to get all Receptions");
        return receptionRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Reception> findByUserIsCurrentUser(Pageable pageable) {
        log.debug("Request to get all Receptions");
        return receptionRepository.findByUserIsCurrentUser(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Reception> findOne(Long id) {
        log.debug("Request to get Reception : {}", id);
        return receptionRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Reception : {}", id);
        receptionRepository.deleteById(id);
    }
}
