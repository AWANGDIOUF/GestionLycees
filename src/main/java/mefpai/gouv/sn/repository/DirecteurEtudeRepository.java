package mefpai.gouv.sn.repository;

import mefpai.gouv.sn.domain.DirecteurEtude;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the DirecteurEtude entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DirecteurEtudeRepository extends JpaRepository<DirecteurEtude, Long> {}
