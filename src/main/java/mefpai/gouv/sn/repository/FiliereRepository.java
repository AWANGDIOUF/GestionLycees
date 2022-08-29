package mefpai.gouv.sn.repository;

import java.util.List;
import mefpai.gouv.sn.domain.Filiere;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Filiere entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FiliereRepository extends JpaRepository<Filiere, Long> {
    @Query("select filiere from Filiere filiere where  filiere.directeur.user.login = ?#{principal.username}")
    Page<Filiere> findByUserIsCurrentUser(Pageable pageable);
}
