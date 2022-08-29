package mefpai.gouv.sn.repository;

import java.util.List;
import mefpai.gouv.sn.domain.PersonnelAdministratif;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the PersonnelAdministratif entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PersonnelAdministratifRepository extends JpaRepository<PersonnelAdministratif, Long> {
    @Query(
        "select personnelAdministratif from PersonnelAdministratif personnelAdministratif where personnelAdministratif.proviseur.user.login = ?#{principal.username}"
    )
    Page<PersonnelAdministratif> findByUserIsCurrentUser(Pageable pageable);
}
