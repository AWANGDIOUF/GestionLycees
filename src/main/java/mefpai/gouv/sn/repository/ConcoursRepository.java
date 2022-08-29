package mefpai.gouv.sn.repository;

import java.util.List;
import java.util.Optional;
import mefpai.gouv.sn.domain.Concours;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Concours entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConcoursRepository extends JpaRepository<Concours, Long> {
    @Query("select concours from Concours concours where concours.directeur.user.login = ?#{principal.username}")
    Page<Concours> findByUserIsCurrentUser(Pageable pageable);
}
