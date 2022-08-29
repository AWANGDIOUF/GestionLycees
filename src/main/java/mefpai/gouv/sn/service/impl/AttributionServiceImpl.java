package mefpai.gouv.sn.service.impl;

import java.util.Optional;
import mefpai.gouv.sn.domain.Attribution;
import mefpai.gouv.sn.repository.AttributionRepository;
import mefpai.gouv.sn.service.AttributionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Attribution}.
 */
@Service
@Transactional
public class AttributionServiceImpl implements AttributionService {

    private final Logger log = LoggerFactory.getLogger(AttributionServiceImpl.class);

    private final AttributionRepository attributionRepository;

    public AttributionServiceImpl(AttributionRepository attributionRepository) {
        this.attributionRepository = attributionRepository;
    }

    @Override
    public Attribution save(Attribution attribution) {
        log.debug("Request to save Attribution : {}", attribution);
        return attributionRepository.save(attribution);
    }

    @Override
    public Optional<Attribution> partialUpdate(Attribution attribution) {
        log.debug("Request to partially update Attribution : {}", attribution);

        return attributionRepository
            .findById(attribution.getId())
            .map(
                existingAttribution -> {
                    if (attribution.getBeneficiaire() != null) {
                        existingAttribution.setBeneficiaire(attribution.getBeneficiaire());
                    }
                    if (attribution.getFonction() != null) {
                        existingAttribution.setFonction(attribution.getFonction());
                    }
                    if (attribution.getDate() != null) {
                        existingAttribution.setDate(attribution.getDate());
                    }

                    return existingAttribution;
                }
            )
            .map(attributionRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Attribution> findAll(Pageable pageable) {
        log.debug("Request to get all Attributions");
        return attributionRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Attribution> findOne(Long id) {
        log.debug("Request to get Attribution : {}", id);
        return attributionRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Attribution : {}", id);
        attributionRepository.deleteById(id);
    }
}
