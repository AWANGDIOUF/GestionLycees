package mefpai.gouv.sn.repository;

import java.util.List;
import mefpai.gouv.sn.domain.PersonnelAppui;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the PersonnelAppui entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PersonnelAppuiRepository extends JpaRepository<PersonnelAppui, Long> {
    @Query("select personnelAppui from PersonnelAppui personnelAppui where personnelAppui.directeur.user.login = ?#{principal.username}")
    Page<PersonnelAppui> findByUserIsCurrentUser(Pageable pageable);
}
