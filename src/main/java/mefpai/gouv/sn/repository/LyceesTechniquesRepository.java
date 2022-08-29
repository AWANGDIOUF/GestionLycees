package mefpai.gouv.sn.repository;

import mefpai.gouv.sn.domain.LyceesTechniques;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the LyceesTechniques entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LyceesTechniquesRepository extends JpaRepository<LyceesTechniques, Long> {}
