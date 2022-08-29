package mefpai.gouv.sn.repository;

import mefpai.gouv.sn.domain.ComptableMatiere;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ComptableMatiere entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ComptableMatiereRepository extends JpaRepository<ComptableMatiere, Long> {}
