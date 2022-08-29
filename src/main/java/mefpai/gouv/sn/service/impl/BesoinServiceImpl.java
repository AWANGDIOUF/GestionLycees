package mefpai.gouv.sn.service.impl;

import java.util.Optional;
import mefpai.gouv.sn.domain.Besoin;
import mefpai.gouv.sn.repository.BesoinRepository;
import mefpai.gouv.sn.service.BesoinService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Besoin}.
 */
@Service
@Transactional
public class BesoinServiceImpl implements BesoinService {

    private final Logger log = LoggerFactory.getLogger(BesoinServiceImpl.class);

    private final BesoinRepository besoinRepository;

    public BesoinServiceImpl(BesoinRepository besoinRepository) {
        this.besoinRepository = besoinRepository;
    }

    @Override
    public Besoin save(Besoin besoin) {
        log.debug("Request to save Besoin : {}", besoin);
        return besoinRepository.save(besoin);
    }

    @Override
    public Optional<Besoin> partialUpdate(Besoin besoin) {
        log.debug("Request to partially update Besoin : {}", besoin);

        return besoinRepository
            .findById(besoin.getId())
            .map(
                existingBesoin -> {
                    if (besoin.getType() != null) {
                        existingBesoin.setType(besoin.getType());
                    }
                    if (besoin.getAutreBesoin() != null) {
                        existingBesoin.setAutreBesoin(besoin.getAutreBesoin());
                    }
                    if (besoin.getDesignation() != null) {
                        existingBesoin.setDesignation(besoin.getDesignation());
                    }
                    if (besoin.getEtatActuel() != null) {
                        existingBesoin.setEtatActuel(besoin.getEtatActuel());
                    }
                    if (besoin.getInterventionSouhaitee() != null) {
                        existingBesoin.setInterventionSouhaitee(besoin.getInterventionSouhaitee());
                    }
                    if (besoin.getJustification() != null) {
                        existingBesoin.setJustification(besoin.getJustification());
                    }

                    return existingBesoin;
                }
            )
            .map(besoinRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Besoin> findAll(Pageable pageable) {
        log.debug("Request to get all Besoins");
        return besoinRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Besoin> findByUserIsCurrentUser(Pageable pageable) {
        log.debug("Request to get all Besoins");
        return besoinRepository.findByUserIsCurrentUser(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Besoin> findOne(Long id) {
        log.debug("Request to get Besoin : {}", id);
        return besoinRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Besoin : {}", id);
        besoinRepository.deleteById(id);
    }
}
