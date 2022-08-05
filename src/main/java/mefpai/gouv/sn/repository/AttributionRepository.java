package mefpai.gouv.sn.repository;

import mefpai.gouv.sn.domain.Attribution;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Attribution entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AttributionRepository extends JpaRepository<Attribution, Long> {}
